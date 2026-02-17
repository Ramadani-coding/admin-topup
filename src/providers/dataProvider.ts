import { type DataProvider, fetchUtils } from "react-admin";
import queryString from "query-string";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("auth_token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

// src/providers/dataProvider.ts
export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const page = params.pagination?.page ?? 1;
    const perPage = params.pagination?.perPage ?? 10;
    const field = params.sort?.field ?? "id";
    const order = params.sort?.order ?? "ASC";

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter || {}),
    };

    const url = `${apiUrl}/admin/${resource}?${queryString.stringify(query)}`;
    const { json, headers } = await httpClient(url);

    // Ambil data dari response backend kamu
    const data = json.data || json[resource] || json;

    return {
      data: Array.isArray(data) ? data : [],
      // FIX: Jika header content-range kosong, gunakan panjang array
      total: headers.get("content-range")
        ? parseInt(headers.get("content-range")?.split("/").pop() || "0", 10)
        : Array.isArray(data)
          ? data.length
          : 0,
    };
  },

  // FIX: Wajib menambahkan fungsi 'create' agar build tidak error
  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/admin/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  // getOne, update, delete tetap biarkan seperti sebelumnya
  getOne: async (resource, params) => {
    const { json } = await httpClient(
      `${apiUrl}/admin/${resource}/${params.id}`,
    );
    const resourceSingle = resource.endsWith("s")
      ? resource.slice(0, -1)
      : resource;
    return { data: json[resourceSingle] || json.data || json };
  },

  getMany: async () => ({ data: [] }),
  getManyReference: async () => ({ data: [], total: 0 }),
  update: async (resource, params) => {
    const url = `${apiUrl}/admin/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });

    // FIX: Ambil elemen pertama jika balasan dari backend adalah Array
    const updatedRecord = Array.isArray(json.data)
      ? json.data[0]
      : json.data || json;

    // Pastikan objek memiliki 'id' agar React Admin tidak error
    return { data: updatedRecord };
  },
  updateMany: () => Promise.reject("Read-only"),
  delete: async (resource, params) => {
    const url = `${apiUrl}/admin/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE", // Sesuai router.delete
    });
    return { data: json.data || json };
  },
  deleteMany: () => Promise.reject("Read-only"),
};

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  FunctionField,
  TextInput,
  ShowButton,
  DeleteButton,
  TopToolbar,
  ExportButton,
} from "react-admin";
import { Chip } from "@mui/material";
import SyncButton from "../../components/custom/SyncButton";

const productFilters = [
  <TextInput source="q" label="Cari Produk / SKU" alwaysOn />,
];

const ListActions = () => (
  <TopToolbar>
    <SyncButton /> {/* Tombol Sinkronisasi muncul di sini */}
    <ExportButton />
  </TopToolbar>
);

export const ProductList = () => (
  <List
    actions={<ListActions />}
    filters={productFilters}
    title="Daftar Produk Top-up"
    sort={{ field: "product_name", order: "ASC" }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      {/* Kolom Kategori (mengambil dari join categories.name) */}
      <FunctionField
        label="Kategori"
        source="category_name"
        render={(record: any) => (
          <Chip
            label={record.category_name}
            size="small"
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          />
        )}
      />

      <TextField source="sku_code" label="SKU" />
      <TextField source="product_name" label="Nama Produk" />

      {/* Harga Modal & Jual */}
      <NumberField
        source="price_cost"
        label="Modal"
        options={{ style: "currency", currency: "IDR" }}
      />
      <NumberField
        source="price_sell"
        label="Jual"
        options={{ style: "currency", currency: "IDR" }}
      />

      {/* Status dengan warna hijau sesuai gambar */}
      <FunctionField
        label="Status"
        source="status"
        render={(record: any) => (
          <Chip
            label={record.status}
            color={record.status === "active" ? "success" : "default"}
            size="small"
          />
        )}
      />

      <ShowButton label="Detail" />
      <DeleteButton label="Hapus" />
    </Datagrid>
  </List>
);

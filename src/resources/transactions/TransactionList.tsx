import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  NumberField,
  SelectInput,
  FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";

// Filter pencarian yang lebih lengkap
const transactionFilters = [
  // 'q' untuk pencarian umum (Ref ID, No HP, Produk)
  <TextInput source="q" label="Cari Transaksi" alwaysOn />,
  <TextInput source="customer_no" label="Nomor Tujuan" />,
  <TextInput source="ref_id" label="Reference ID" />,
  // Menambahkan filter status untuk mempermudah pemantauan
  <SelectInput
    source="status"
    label="Status"
    choices={[
      { id: "sukses", name: "Sukses" },
      { id: "pending", name: "Pending" },
      { id: "gagal", name: "Gagal" },
    ]}
  />,
];

export const TransactionList = () => (
  <List
    title="Semua Transaksi Top-up"
    filters={transactionFilters}
    sort={{ field: "created_at", order: "DESC" }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="ref_id" label="Ref ID" />
      <TextField source="customer_no" label="Tujuan" />
      <TextField source="display_name" label="Produk" />
      <NumberField
        source="amount_sell"
        label="Harga"
        options={{ style: "currency", currency: "IDR" }}
      />

      {/* MENGGUNAKAN FUNCTION FIELD AGAR TIDAK KOSONG LAGI */}
      <FunctionField
        label="Status"
        render={(record: any) => {
          if (!record) return null;

          // Gunakan status_label, jika tidak ada (karena backend belum siap) pakai status asli
          const label = record.status_label || record.status;

          let color: "success" | "warning" | "error" | "default" = "default";

          // Logika pewarnaan
          if (label === "Success" || label === "sukses") color = "success";
          if (label === "Waiting Payment" || label === "pending")
            color = "warning";
          if (label === "Cancel") color = "error";

          return <Chip label={label} color={color} size="small" />;
        }}
      />

      <DateField source="created_at" label="Waktu" showTime />
    </Datagrid>
  </List>
);

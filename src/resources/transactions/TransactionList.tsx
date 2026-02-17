import {
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  NumberField,
  SelectInput,
  FunctionField,
  SimpleList,
} from "react-admin";
import {
  Chip,
  Typography,
  useMediaQuery,
  Box,
  type Theme,
} from "@mui/material";

const transactionFilters = [
  <TextInput source="q" label="Cari Transaksi" alwaysOn />,
  <TextInput source="customer_no" label="Nomor Tujuan" />,
  <TextInput source="ref_id" label="Reference ID" />,
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

// Helper untuk status chip agar kode tetap bersih
const StatusChip = ({ record }: { record: any }) => {
  if (!record) return null;
  const label = record.status_label || record.status;
  let color: "success" | "warning" | "error" | "default" = "default";

  if (label === "Success" || label === "sukses") color = "success";
  if (label === "Waiting Payment" || label === "pending") color = "warning";
  if (label === "Cancel" || label === "gagal") color = "error";

  return <Chip label={label} color={color} size="small" />;
};

export const TransactionList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <List
      title="Semua Transaksi Top-up"
      filters={transactionFilters}
      sort={{ field: "created_at", order: "DESC" }}
    >
      {isSmall ? (
        /* TAMPILAN MOBILE: Mengubah tabel menjadi daftar vertikal */
        <SimpleList
          primaryText={(record) => record.display_name}
          secondaryText={(record) => (
            <Box component="span">
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(record.amount_sell)}
              </Typography>
              {` | ${record.ref_id}`}
            </Box>
          )}
          tertiaryText={(record) => (
            <Box sx={{ textAlign: "right" }}>
              <StatusChip record={record} />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {new Date(record.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          )}
          linkType="show"
        />
      ) : (
        /* TAMPILAN DESKTOP: Tetap menggunakan Datagrid lengkap */
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="ref_id" label="Ref ID" />
          <TextField source="customer_no" label="Tujuan" />
          <TextField source="display_name" label="Produk" />
          <NumberField
            source="amount_sell"
            label="Harga"
            options={{ style: "currency", currency: "IDR" }}
          />
          <FunctionField
            label="Status"
            render={(record: any) => <StatusChip record={record} />}
          />
          <DateField source="created_at" label="Waktu" showTime />
        </Datagrid>
      )}
    </List>
  );
};

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
  SimpleList, // Tambahkan ini
} from "react-admin";
import {
  Chip,
  useMediaQuery,
  Box,
  Typography,
  type Theme,
} from "@mui/material";
import SyncButton from "../../components/custom/SyncButton";

const productFilters = [
  <TextInput source="q" label="Cari Produk / SKU" alwaysOn />,
];

const ListActions = () => (
  <TopToolbar>
    <SyncButton />
    <ExportButton />
  </TopToolbar>
);

export const ProductList = () => {
  // Deteksi layar HP
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <List
      actions={<ListActions />}
      filters={productFilters}
      title="Daftar Produk Top-up"
      sort={{ field: "product_name", order: "ASC" }}
    >
      {isSmall ? (
        /* TAMPILAN MOBILE: Desain vertikal mirip transaksi */
        <SimpleList
          primaryText={(record) => record.product_name}
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
                }).format(record.price_sell)}
              </Typography>
              {` | ${record.sku_code}`}
            </Box>
          )}
          tertiaryText={(record) => (
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 0.5,
              }}
            >
              <Chip
                label={record.status}
                color={record.status === "active" ? "success" : "default"}
                size="small"
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", color: "text.secondary" }}
              >
                {record.category_name}
              </Typography>
            </Box>
          )}
          linkType="show"
        />
      ) : (
        /* TAMPILAN DESKTOP: Tetap menggunakan Datagrid lama */
        <Datagrid rowClick="show" bulkActionButtons={false}>
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
      )}
    </List>
  );
};

// src/resources/products/ProductShow.tsx
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  FunctionField,
  Labeled,
  DateField,
} from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Box,
  useMediaQuery,
  type Theme,
} from "@mui/material";

export const ProductShow = () => {
  // Cek apakah user menggunakan layar HP
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Show title="Rincian Informasi Produk">
      <SimpleShowLayout
        sx={{ "& .RaSimpleShowLayout-stack": { display: "block" } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: isSmall ? 1.5 : 2, // Spasi lebih rapat di mobile agar hemat layar
            width: "100%",
            mt: isSmall ? 1 : 2,
          }}
        >
          {/* IDENTITAS PRODUK */}
          <Card variant="outlined">
            <CardContent sx={{ p: isSmall ? 2 : 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Identitas Produk
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", // Stack vertikal di HP
                  gap: 2,
                }}
              >
                <Labeled label="Kategori">
                  <FunctionField
                    render={(record: any) => (
                      <Chip
                        label={record.category_name}
                        color="warning"
                        size="small"
                      />
                    )}
                  />
                </Labeled>
                <Labeled label="Kode SKU">
                  <TextField source="sku_code" sx={{ fontWeight: "bold" }} />
                </Labeled>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Labeled label="Nama Produk">
                  <TextField source="product_name" />
                </Labeled>
              </Box>
            </CardContent>
          </Card>

          {/* ANALISA KEUNTUNGAN */}
          <Card variant="outlined">
            <CardContent sx={{ p: isSmall ? 2 : 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Analisa Keuntungan
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box
                sx={{
                  display: "grid",
                  // 2 kolom di HP agar tidak terlalu panjang, 4 kolom di Laptop
                  gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4, 1fr)",
                  gap: 2,
                }}
              >
                <Labeled label="Harga Modal">
                  <NumberField
                    source="price_cost"
                    options={{ style: "currency", currency: "IDR" }}
                  />
                </Labeled>
                <Labeled label="Harga Jual">
                  <NumberField
                    source="price_sell"
                    options={{ style: "currency", currency: "IDR" }}
                    sx={{ fontWeight: "bold", color: "warning.main" }}
                  />
                </Labeled>
                <Labeled label="Untung (Rp)">
                  <FunctionField
                    render={(record: any) => (
                      <Typography
                        sx={{ color: "success.main", fontWeight: "bold" }}
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(record.price_sell - record.price_cost)}
                      </Typography>
                    )}
                  />
                </Labeled>
                <Labeled label="Margin (%)">
                  <FunctionField
                    render={(record: any) => {
                      const untung = record.price_sell - record.price_cost;
                      const margin =
                        record.price_sell > 0
                          ? ((untung / record.price_sell) * 100).toFixed(2)
                          : "0.00";
                      return (
                        <Chip
                          label={`${margin}%`}
                          color="success"
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: "bold" }}
                        />
                      );
                    }}
                  />
                </Labeled>
              </Box>
            </CardContent>
          </Card>

          {/* STATUS */}
          <Card variant="outlined">
            <CardContent sx={{ p: isSmall ? 2 : 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", // Stack di mobile
                  gap: 2,
                }}
              >
                <Labeled label="Status">
                  <FunctionField
                    render={(record: any) => (
                      <Chip
                        label={record.status}
                        color={
                          record.status === "active" ? "success" : "default"
                        }
                        size="small"
                      />
                    )}
                  />
                </Labeled>
                <Labeled label="Terakhir Diperbarui">
                  <DateField source="updated_at" showTime />
                </Labeled>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};

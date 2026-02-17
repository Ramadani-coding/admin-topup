// src/resources/transactions/TransactionShow.tsx
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  FunctionField,
  Labeled,
} from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  useTheme, // Tambahkan ini untuk deteksi mode
  useMediaQuery,
  type Theme,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";

export const TransactionShow = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Show title="Detail Lengkap Transaksi">
      <SimpleShowLayout
        sx={{ "& .RaSimpleShowLayout-stack": { display: "block" } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            width: "100%",
            mt: 2,
          }}
        >
          {/* SECTION 1: PRODUK */}
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.primary.main,
                }}
              >
                <ShoppingCartIcon /> Informasi Produk
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "grid", gap: 2 }}>
                <Labeled label="Invoice">
                  <TextField source="ref_id" sx={{ fontWeight: "bold" }} />
                </Labeled>
                <Labeled label="Nama Produk">
                  <TextField
                    source="display_name"
                    sx={{ fontWeight: "bold" }}
                  />
                </Labeled>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Labeled label="SKU Code">
                    <TextField source="sku_code" />
                  </Labeled>
                  <Labeled label="Status Pesanan">
                    <TextField source="status" />
                  </Labeled>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* SECTION 2: PELANGGAN */}
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.primary.main,
                }}
              >
                <PersonIcon /> Data Pelanggan
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Labeled label="Tujuan / User ID">
                <TextField
                  source="customer_no"
                  sx={{
                    fontSize: isSmall ? "1rem" : "1.1rem",
                    fontWeight: "bold",
                  }}
                />
              </Labeled>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Nomor WhatsApp Pelanggan
                </Typography>
                <FunctionField
                  render={(record: any) => {
                    if (!record?.phone_number)
                      return <Typography>-</Typography>;
                    const rawPhone = record.phone_number.replace(/\D/g, "");
                    const waPhone = rawPhone.startsWith("0")
                      ? "62" + rawPhone.substring(1)
                      : rawPhone;
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: isSmall ? "column" : "row",
                          alignItems: isSmall ? "flex-start" : "center",
                          gap: isSmall ? 1 : 2,
                          mt: 0.5,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {record.phone_number}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#25D366",
                            color: "#fff",
                            "&:hover": { bgcolor: "#128C7E" },
                          }}
                          size="small"
                          startIcon={<WhatsAppIcon />}
                          href={`https://api.whatsapp.com/send?phone=${waPhone}`}
                          target="_blank"
                        >
                          CHAT WA
                        </Button>
                      </Box>
                    );
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* SECTION 3: KEUANGAN - FIX DARK MODE */}
          <Box sx={{ gridColumn: { md: "span 2" } }}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: isDarkMode ? "background.paper" : "#f8f9fa",
                border: isDarkMode
                  ? `1px solid ${theme.palette.divider}`
                  : "default",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.primary.main,
                  }}
                >
                  <AccountBalanceWalletIcon /> Rincian Biaya & Keuntungan
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                    gap: 3,
                    mb: 2,
                  }}
                >
                  <Labeled label="Harga Jual">
                    <NumberField
                      source="amount_sell"
                      options={{ style: "currency", currency: "IDR" }}
                    />
                  </Labeled>
                  <Labeled label="Harga Modal">
                    <NumberField
                      source="amount_cost"
                      options={{ style: "currency", currency: "IDR" }}
                    />
                  </Labeled>
                  <Labeled label="Biaya Admin">
                    <NumberField
                      source="fee"
                      options={{ style: "currency", currency: "IDR" }}
                    />
                  </Labeled>
                </Box>

                {/* ESTIMASI BOX: Disesuaikan agar kontras di Dark/Light Mode */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: isDarkMode ? "rgba(76, 175, 80, 0.1)" : "#e8f5e9",
                    border: `1px solid ${isDarkMode ? "rgba(76, 175, 80, 0.3)" : "#c8e6c9"}`,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      color: "success.main",
                      letterSpacing: 1,
                    }}
                  >
                    ESTIMASI KEUNTUNGAN BERSIH
                  </Typography>
                  <FunctionField
                    render={(record: any) => {
                      const profit =
                        (record.amount_sell || 0) - (record.amount_cost || 0);
                      const percentage =
                        record.amount_sell > 0
                          ? ((profit / record.amount_sell) * 100).toFixed(2)
                          : "0";
                      return (
                        <Box>
                          <Typography
                            variant={isSmall ? "h5" : "h4"}
                            sx={{
                              fontWeight: "bold",
                              color: "success.main",
                              my: 0.5,
                            }}
                          >
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(profit)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "success.main" }}
                          >
                            Margin Laba: <strong>{percentage}%</strong>
                          </Typography>
                        </Box>
                      );
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* SECTION 4: SN & LAINNYA */}
          <Box sx={{ gridColumn: { md: "span 2" } }}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
                    gap: 2,
                  }}
                >
                  <Labeled label="Serial Number (SN)">
                    <FunctionField
                      render={(record: any) => (
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            bgcolor: isDarkMode
                              ? "rgba(255,255,255,0.05)"
                              : "#f1f1f1",
                            color: isDarkMode
                              ? theme.palette.text.primary
                              : "inherit",
                            p: 1,
                            borderRadius: 0.5,
                            wordBreak: "break-all",
                            fontSize: "0.85rem",
                          }}
                        >
                          {record.sn || "-"}
                        </Typography>
                      )}
                    />
                  </Labeled>
                  <Labeled label="Message">
                    <FunctionField
                      render={(record: any) => record.message || "-"}
                    />
                  </Labeled>
                  <Labeled label="Payment Status">
                    <TextField
                      source="payment_status"
                      sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    />
                  </Labeled>
                  <Labeled label="Metode Bayar">
                    <TextField
                      source="payment_method"
                      sx={{ textTransform: "uppercase" }}
                    />
                  </Labeled>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};

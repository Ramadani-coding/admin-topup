import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";

export const BestSellingProducts = ({ products }: { products: any[] }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: isDarkMode
          ? "0px 4px 20px rgba(0,0,0,0.5)"
          : "0px 4px 20px rgba(0,0,0,0.05)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
          Best Selling Products
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {products.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "auto 1fr",
                    md: "50px 2fr 1fr 1fr 1fr 1.5fr",
                  },
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Ikon Produk */}
                <Avatar
                  variant="rounded"
                  sx={{ width: 45, height: 45, bgcolor: "grey.200" }}
                />

                {/* Nama Produk */}
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {item.name}
                </Typography>

                {/* Data Angka (Hidden di mobile agar tidak sesak) */}
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    color="primary"
                  >
                    {item.orders}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Orders
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    color="success.main"
                  >
                    {item.paid}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Paid
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    color="warning.main"
                  >
                    {item.paidRatio}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Ratio
                  </Typography>
                </Box>

                {/* Revenue (Selalu tampil karena ini data terpenting) */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 800, color: "success.main" }}
                  >
                    {item.formattedRevenue}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: { md: "none" } }}
                  >
                    {item.paid} Paid ({item.paidRatio}%)
                  </Typography>
                </Box>
              </Box>
              {index < products.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

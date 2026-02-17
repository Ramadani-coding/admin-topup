import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  ChipField,
  EditButton,
  SimpleList,
} from "react-admin";
import { Avatar, Typography, useMediaQuery, type Theme } from "@mui/material";

export const CategoryList = () => {
  // Cek apakah user menggunakan layar kecil (Mobile)
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <List title="Manage Categories" sort={{ field: "name", order: "ASC" }}>
      {isSmall ? (
        /* TAMPILAN MOBILE: Vertikal, bersih, dan mudah di-klik */
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => {
            // Fix floating point bug untuk mobile
            const percentVal = record.markup_percent
              ? (record.markup_percent * 100).toFixed(2)
              : null;
            const percentClean = percentVal ? `${parseFloat(percentVal)}%` : "";
            const flat = record.markup_flat
              ? `Rp ${record.markup_flat.toLocaleString("id-ID")}`
              : "";

            return record.markup_type === "hybrid"
              ? `${percentClean} / ${flat}`
              : flat || percentClean;
          }}
          leftAvatar={(record) => (
            <Avatar
              src={record.image_url}
              sx={{ width: 45, height: 45, bgcolor: "grey.900" }}
            />
          )}
          tertiaryText={(record) => (
            <Typography
              variant="caption"
              sx={{ color: record.is_active ? "success.main" : "error.main" }}
            >
              {record.is_active ? "● Active" : "● Inactive"}
            </Typography>
          )}
          linkType="edit"
        />
      ) : (
        /* TAMPILAN DESKTOP: Tetap menggunakan tabel lengkap */
        <Datagrid rowClick="edit">
          <FunctionField
            label="Icon"
            render={(record: any) => (
              <Avatar
                src={record.image_url}
                sx={{ width: 35, height: 35, bgcolor: "grey.900" }}
              />
            )}
          />
          <TextField label="Nama Kategori" source="name" />
          <ChipField
            source="markup_type"
            label="Tipe Profit"
            color="success"
            size="small"
          />
          <FunctionField
            label="Nilai Profit"
            render={(record: any) => {
              const percentVal = record.markup_percent
                ? (record.markup_percent * 100).toFixed(2)
                : null;
              const percentClean = percentVal
                ? `${parseFloat(percentVal)}%`
                : "";
              const flat = record.markup_flat
                ? `Rp ${record.markup_flat.toLocaleString("id-ID")}`
                : "";
              return (
                <Typography variant="body2">
                  {record.markup_type === "hybrid"
                    ? `${percentClean} / ${flat}`
                    : flat || percentClean}
                </Typography>
              );
            }}
          />
          <EditButton label="Edit" sx={{ color: "warning.main" }} />
        </Datagrid>
      )}
    </List>
  );
};

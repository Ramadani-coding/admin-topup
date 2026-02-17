// src/resources/categories/CategoryEdit.tsx
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  FormDataConsumer, // Tambahkan ini untuk logika kondisional
} from "react-admin";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  type Theme,
} from "@mui/material";

export const CategoryEdit = () => {
  // Deteksi layar mobile agar tampilan input tetap rapi
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Edit title="Edit Kategori">
      <SimpleForm>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Informasi Gambar & Profit
        </Typography>
        <TextInput label="Image url" source="image_url" fullWidth />

        <Box
          sx={{
            display: "grid",
            // Grid berubah jadi 1 kolom di mobile agar tidak sempit
            gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
            gap: 2,
            width: "100%",
            mt: 1,
          }}
        >
          <SelectInput
            label="Tipe Markup"
            source="markup_type"
            choices={[
              { id: "hybrid", name: "Hybrid (Persen & Flat)" },
              { id: "flat", name: "Flat" },
            ]}
            fullWidth
          />

          {/* LOGIKA SHOW/HIDE: Muncul hanya jika tipe adalah 'hybrid' */}
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.markup_type === "hybrid" && (
                <NumberInput
                  label="Markup Persen (Desimal, contoh: 0.03)"
                  source="markup_percent"
                  step={0.01}
                  fullWidth
                  {...rest}
                />
              )
            }
          </FormDataConsumer>
        </Box>

        <NumberInput
          label="Markup Flat (Nominal Rupiah)"
          source="markup_flat"
          fullWidth
          sx={{ mt: isSmall ? 0 : 1 }}
        />

        <Divider sx={{ my: 2, width: "100%" }} />

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Konfigurasi Input Pelanggan
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
            gap: 2,
            width: "100%",
          }}
        >
          <TextInput label="Input type" source="input_type" fullWidth />
          <TextInput label="Placeholder" source="placeholder" fullWidth />
        </Box>

        <TextInput label="Check sku" source="check_sku" fullWidth multiline />

        <Divider sx={{ my: 2, width: "100%" }} />

        {/* SERVER LIST JSONB - Dioptimalkan untuk Mobile */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Server List
        </Typography>
        <ArrayInput source="server_list">
          <SimpleFormIterator
            inline={!isSmall} // Matikan inline di mobile agar input bertumpuk rapi
          >
            <TextInput
              source="label"
              label="Label (e.g. Asia)"
              fullWidth={isSmall}
              sx={{ width: isSmall ? "100%" : 250 }}
            />
            <TextInput
              source="value"
              label="Value (e.g. os_asia)"
              fullWidth={isSmall}
              sx={{ width: isSmall ? "100%" : 250 }}
            />
          </SimpleFormIterator>
        </ArrayInput>

        <Box sx={{ mt: 1 }}>
          <BooleanInput label="Status Aktif" source="is_active" />
        </Box>
      </SimpleForm>
    </Edit>
  );
};

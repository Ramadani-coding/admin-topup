import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import transactions from "./resources/transactions";
import { ProductList } from "./resources/products/ProductList";
import { ProductShow } from "./resources/products/ProductShow";

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    dashboard={Dashboard}
  >
    {/* Resource ini akan menarik data dari /admin/transactions sesuai Postman kamu */}
    <Resource
      name="transactions"
      list={transactions.list}
      show={transactions.show}
    />
    <Resource
      name="products"
      list={ProductList}
      show={ProductShow}
      options={{ label: "Manajemen Produk" }}
    />
  </Admin>
);

// Baris ini yang akan menghilangkan error "does not provide an export named 'default'"
export default App;

// pages/admin.tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token; // Retrieve token from cookies
  const userRole = req.cookies.role; // Retrieve user role from cookies

  if (!token || userRole !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass any props needed by your page
  };
};

const AdminPage = () => {
  return <div>Admin Dashboard</div>;
};

export default AdminPage;

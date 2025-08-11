import { Container, ContainerProps } from "@mui/material";
interface ContainerLayoutProps {
  children: React.ReactNode;
  containerProps?: ContainerProps;
}
const ContainerLayout = async ({
  children,
  containerProps,
}: ContainerLayoutProps) => {
  return (
    // TODO: Will remove this component once shift completely
    <Container
      sx={{
        minHeight: "500px",
        px: { xs: 0, lg: 2 },
      }}
      {...containerProps}
    >
      {children}
    </Container>
  );
};

export default ContainerLayout;

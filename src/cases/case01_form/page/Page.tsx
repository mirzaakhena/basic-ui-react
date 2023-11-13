import MirzaForm, { DataType } from "../components/MirzaForm";

const Page = () => {
  //

  const onSubmit = (data: DataType) => {
    console.log(data);
  };

  return (
    <>
      <MirzaForm
        onSubmit={onSubmit}
        defaultValue={{
          name: "Mirzaa",
        }}
      />
    </>
  );
};

export default Page;

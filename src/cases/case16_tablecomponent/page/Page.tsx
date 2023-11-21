import TableComponent from "../component/TableComponent";

const Page = () => {
  return (
    <>
      <TableComponent
        httpData={{
          usecase: "somethingGetAll",
          method: "get",
          path: "/users",
          tag: "user",
          response: {
            200: {
              content: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      addresses: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        }}
        items={[
          {
            id: "1",
            name: "mirza",
            addresses: "Bandung",
          },
          {
            id: "2",
            name: "Zunan",
            addresses: "Jogja",
          },
          {
            id: "3",
            name: "Omar",
            addresses: "Medan",
          },
        ]}
      />
    </>
  );
};

export default Page;

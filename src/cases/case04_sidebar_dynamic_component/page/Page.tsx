import { BrowserRouter } from "react-router-dom";
import MyLayout from "../component/MyLayout";

const Page = () => {
  //

  const usecaseDatas = [
    {
      tag: "User",
      controllers: [
        //
        { usecase: "userChangeStatus", data: ["status"] },
        { usecase: "userCreate", data: ["name", "age", "address", "hobbies"] },
        { usecase: "userGetAll", data: ["id", "date", "description"] },
      ],
    },
    {
      tag: "Reward",
      controllers: [
        //
        { usecase: "rewardApprove", data: ["userid", "status"] },
        { usecase: "rewardGetAll", data: ["id", "created", "summary"] },
      ],
    },
    {
      tag: "Receipt",
      controllers: [
        //
        { usecase: "receiptUpload", data: ["billNumber", "userid"] },
        { usecase: "receiptGetAll", data: ["id", "date", "billnumber", "point"] },
      ],
    },
  ];

  return (
    <>
      <BrowserRouter>
        <MyLayout usecaseDatas={usecaseDatas} />
      </BrowserRouter>
    </>
  );
};

export default Page;

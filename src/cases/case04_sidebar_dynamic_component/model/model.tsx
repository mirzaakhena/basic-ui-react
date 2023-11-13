export type Controller = {
  usecase: string;
  data: string[];
};

export type UsecasesData = {
  tag: string;
  controllers: Controller[];
};

// interface FormField {
//   name: string;
//   defaultValue: string;
//   currentValue: string;
//   dataType: string;
// }

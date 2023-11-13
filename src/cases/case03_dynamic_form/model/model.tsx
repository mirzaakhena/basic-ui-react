//

type GeneralInfoType = {
  summary?: string;
  description?: string;
  required?: boolean;
};

export type StringType = GeneralInfoType & {
  type: "string";
  maxLength?: number;
  default?: string;
};

export type EnumType = GeneralInfoType & {
  type: "enum";
  enum: string[];
  default?: string;
};

export type NumberType = GeneralInfoType & {
  type: "number";
  max?: number;
  min?: number;
  default?: number;
};

export type DateType = GeneralInfoType & {
  type: "date";
  default?: string;
};

export type PasswordType = GeneralInfoType & {
  type: "password";
};

export type BooleanType = GeneralInfoType & {
  type: "boolean";
};

export type TextAreaType = GeneralInfoType & {
  type: "text";
  textAreaLine: number;
  default?: string;
};

export type InputType = StringType | EnumType | NumberType | BooleanType | DateType | PasswordType | TextAreaType | ObjectType | ArrayType;

export type RecordInputType = Record<string, InputType>;

export type ObjectType = GeneralInfoType & {
  type: "object";
  properties: RecordInputType;
  default?: any;
};

export type ArrayType = GeneralInfoType & {
  type: "array";
  items: StringType | EnumType | NumberType | BooleanType | DateType | TextAreaType | ObjectType;
  default?: any[];
};

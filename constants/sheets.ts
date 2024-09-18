import { SheetDefinition } from "react-native-actions-sheet";

declare module "react-native-actions-sheet" {
  interface Sheets {
    authentication: SheetDefinition<{ payload: { isRegistering?: boolean } }>;
    editProfile: SheetDefinition;
    changePassword: SheetDefinition;
    createEvent: SheetDefinition<{ payload: { isEditing?: boolean } }>;
  }
}

export {};

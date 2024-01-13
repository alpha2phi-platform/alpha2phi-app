import { useRoutes } from "react-router-dom";

import { Workspace } from "@/features/workspace";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Workspace /> }];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};

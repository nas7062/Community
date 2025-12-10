// components/AuthRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Redirect, useRootNavigationState } from "expo-router";
import React, { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { user, loading } = useAuth();
  const rootState = useRootNavigationState();

  // 네비게이션 트리가 아직 준비가 안 된 경우 + auth 로딩 중에는 아무 것도 렌더하지 않음
  if (!rootState?.key || loading) {
    return null; // 여기서 로딩 스피너를 보여주고 싶으면 컴포넌트 넣어도 됨
  }

  if (!user) {
    // 여기 경로는 실제 auth 그룹에 맞게 수정: "/(auth)" 또는 "/auth/login" 등
    return <Redirect href="/auth" />;
  }

  // 인증 OK → children 한 번만 그대로 렌더
  return <>{children}</>;
}

export default AuthRoute;

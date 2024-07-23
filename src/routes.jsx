import { Route, Routes } from "react-router-dom";
import Register from "./app/account/register/page";
import HomePage from "./components/HomePage";
import VerifyEmail from "./app/account/verify-email/page";
import ResetPasswordLink from "./app/account/reset-password-link/page";
import Login from "./app/account/login/page";
import ResetPasswordConfirm from "./app/account/reset-password-confirm/[id]/[token]/page";
import Profile from "./app/user/profile/page";
import ChangePassword from "./app/user/change-password/page";
import UserProfileSetting from "./app/user/settings/page";
import About from "./components/About";
import DistrictSection from "./components/District/DistrictSection";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/account/login" element={<Login />} />
    <Route path="/account/register" element={<Register />} />
    <Route path="/account/verify-email" element={<VerifyEmail />} />
    <Route
      path="/account/reset-password-link"
      element={<ResetPasswordLink />}
    />
    <Route
      path="/account/reset-password-confirm/:id/:token"
      element={<ResetPasswordConfirm />}
    />
    <Route path="/user/profile" element={<Profile />} />
    <Route path="/user/change-password" element={<ChangePassword />} />
    <Route path="/user/settings" element={<UserProfileSetting/>} />
    <Route path="/user/about" element={<About/>} />
    <Route path="/user/state/district/:stateName" element={<DistrictSection/>} />

  </Routes>
);

export default AppRoutes;

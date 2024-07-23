import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Avatar,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import Register from "../app/account/register/page";
import Login from "../app/account/login/page";
import Cookies from "js-cookie";
import {
  useLogoutUserMutation,
  useLoginUserMutation,
} from "../lib/services/auth";
import { useNavigate } from "react-router-dom";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(Cookies.get("is_auth"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const [logoutUser] = useLogoutUserMutation();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.data && response.data.status === "success") {
        Cookies.remove("is_auth");
        setIsAuth(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSuccess = () => {
    Cookies.set("is_auth", "true");
    setIsAuth(true);
    onClose();
    navigate("/user/profile");
  };

  useEffect(() => {
    const authCookie = Cookies.get("is_auth");
    setIsAuth(authCookie);
  }, []);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const showLoginModal = () => {
    setOverlay(<OverlayOne />);
    setModalContent(<Login onSuccess={handleLoginSuccess} onClose={onClose} />);
    onOpen();
  };

  const showRegistrationModal = () => {
    setOverlay(<OverlayOne />);
    setModalContent(<Register onClose={onClose} />);
    onOpen();
  };

  return (
    <>
      <nav className="navbar container-fluid">
        <div className="navbar-banner container-fluid">
          <div className="navbar-banner-main-innerdiv container d-flex">
            <div className="navbar-banner-leftside d-flex gap-3">
              <div>contact@example.com</div>
              <div>+91 123456789</div>
            </div>
            <div className="navbar-banner-rightside d-flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-facebook fa-lg"
                  style={{ color: "white" }}
                ></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-instagram fa-lg"
                  style={{ color: "white" }}
                ></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-linkedin fa-lg"
                  style={{ color: "white" }}
                ></i>
              </a>
              <a
                href="https://github.com/vaibhav540/Democracy-Data_035"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-github fa-lg"
                  style={{ color: "white" }}
                ></i>
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-main-content container-fluid">
          <div className="navbar-content container d-flex">
            <div className="navbar-icon d-flex">
              <Link className="navbar-brand" to="/">
                <img
                  style={{
                    objectFit: "cover",
                    width: "100px",
                    height: "45px",
                    borderRadius: "10px",
                  }}
                  src="https://i.pinimg.com/originals/5d/48/ca/5d48ca330a35603adaabb7a4071b4116.jpg"
                  alt="Bootstrap"
                />
              </Link>
            </div>

            <div className="navbar-links d-flex">
              {isAuth ? (
                <>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={
                        <Avatar
                          size={"sm"}
                          src={
                            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                          }
                        />
                      }
                      variant="outline"
                    >
                      <HStack spacing={2}>
                        <Text>Justina Clark</Text>
                        <FiChevronDown />
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} to="/user/profile">
                        Profile
                      </MenuItem>
                      <MenuItem to="/user/settings">Settings</MenuItem>
                      <MenuItem>Billing</MenuItem>
                      <MenuItem>
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          onClick={handleLogout}
                          width="100%"
                        >
                          Sign out
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/user/about" className="nav-link">
                    About
                  </Link>
                  <Link to="#" className="nav-link">
                    Services
                  </Link>
                  <Link to="#" className="nav-link">
                    Portfolio
                  </Link>
                  <Link to="#" className="nav-link">
                    Dashboard
                  </Link>
                  <ButtonGroup spacing={4}>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      color="white"
                      borderColor="white"
                      onClick={showLoginModal}
                    >
                      Login
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      color="white"
                      borderColor="white"
                      onClick={showRegistrationModal}
                    >
                      Registration
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>{modalContent}</ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;

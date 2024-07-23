import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Trending', icon: FiTrendingUp, path: '/trending' },
  { name: 'Explore', icon: FiCompass, path: '/explore' },
  { name: 'Favourites', icon: FiStar, path: '/favourites' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
];

export default function UserSidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: isSidebarOpen ? 'full' : '0', md: isCollapsed ? '20' : '60' }}
        pos="fixed"
        h="full"
        display={{ base: isSidebarOpen ? 'block' : 'none', md: 'block' }}
        transition="width 0.3s"
        overflow="hidden"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            display={isCollapsed ? 'none' : 'block'}
          >
            Logo
          </Text>
          <IconButton
            icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            onClick={toggleCollapse}
            aria-label="collapse sidebar"
            variant="outline"
            ml={isCollapsed ? 'auto' : 0}
          />
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={toggleSidebar} />
        </Flex>
        <Collapse in={!isCollapsed}>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.path)}>
              {link.name}
            </NavItem>
          ))}
        </Collapse>
        <Flex
          direction="column"
          align="center"
          display={isCollapsed ? 'flex' : 'none'}
          p="4"
        >
          {LinkItems.map((link) => (
            <IconButton
              key={link.name}
              icon={<link.icon />}
              aria-label={link.name}
              variant="outline"
              mb="4"
              fontSize="20"
              onClick={() => navigate(link.path)}
            />
          ))}
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} navigate={navigate} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} toggleSidebar={toggleSidebar} />
      <Box ml={{ base: 0, md: isCollapsed ? 20 : 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, navigate }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.path)}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, onClick, ...rest }) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} onClick={onClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, toggleSidebar, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

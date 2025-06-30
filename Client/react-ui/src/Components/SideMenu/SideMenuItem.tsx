import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"

interface SideMenuItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

export const SideMenuItem = ({ icon, children, ...rest }: SideMenuItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="0"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize={24}
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

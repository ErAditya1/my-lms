'use client'
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FaceIcon from '@mui/icons-material/Face';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import ScoreIcon from '@mui/icons-material/Score';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { closeSidebar } from '@/lib/utils';
import Link from 'next/link';

import api from '@/api';
import { useRouter } from 'next/navigation';
import User from './User';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/user/userSlice';
import Image from 'next/image';
import SidebarTop from './SidebarTop';
import { BiSolidBookContent } from 'react-icons/bi';
import { SiApostrophe } from 'react-icons/si';



function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  React.useEffect(() => setOpen(false), []);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);

  const dispatch = useAppDispatch();



  const menuItem = [

    {
      label: 'Dashboard',
      href: `/${user?.role}`,
      icon: user?.role && <DashboardRoundedIcon />,
      visible: ['admin', 'student', 'teacher', 'parent']
    },
    {
      label: 'Home',
      href: '/',
      icon: <HomeRoundedIcon />,
      visible: ['', 'admin', 'student', 'teacher', 'parent']
    },
    {
      label: 'Courses',
      href: '/courses',
      icon: <CastForEducationIcon />,
      visible: ['', 'admin', 'student', 'teacher', 'parent']
    },
    {
      label: 'Posts',
      href: '/posts',
      icon: <SiApostrophe />,
      visible: ['', 'admin', 'student', 'teacher', 'parent']
    },
    {
      label: 'Messages',
      href: '/message',
      icon: <QuestionAnswerRoundedIcon />,
      visible: ['', 'admin', 'student', 'teacher', 'parent']
    },
    {
      label: 'User',
      icon: <GroupRoundedIcon />,
      visible: ['', 'admin', 'student', 'teacher', 'parent'],
      subMenu: [
        {
          label: 'Profile',
          href: '/user/profile',
          icon: <FaceIcon />,
          visible: ['',  'student', 'teacher', 'parent'],
        },
        {
          label: 'Edit Profile',
          href: '/user/edit-profile',
          icon: <PersonAddIcon />,
          visible: ['', 'admin', 'student', 'teacher', 'parent'],
        },

      ]
    },
    {
      label: 'Manage Content',
      icon: <BiSolidBookContent />,
      visible: [ 'admin', 'teacher'],
      subMenu: [
        {
          label: 'Courses',
          href: `/${user?.role}/courses`,
          icon: <CastForEducationIcon />,
          visible: ['admin','teacher'],
        },
        {
          label: 'Posts',
          href: `/${user?.role}/posts`,
          icon: <SiApostrophe />,
          visible: ['admin'],
        },

      ]
    },

  ]

  return (

    <Sheet

      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
      className="Sidebar  dark:bg-card text-foreground z-20"
    >

      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}

      />

      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <SidebarTop />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
          className=""
        >
          {menuItem.map((item, index) => {
            if (item.visible.includes(user?.role!)) {
              if (item.subMenu) {
                return (
                  <ListItem nested key={index}>
                    <Toggler
                      defaultExpanded
                      renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                          {item.icon}
                          <ListItemContent>
                            <Typography level="title-sm">{item.label}</Typography>
                          </ListItemContent>
                          <KeyboardArrowDownIcon
                            sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                          />
                        </ListItemButton>
                      )}
                    >
                      <List>
                        {

                          item.subMenu.map((subItem, index) => {
                            if (item.visible.includes(user?.role!)) {
                              return (
                                <ListItem className=" " key={index}>
                                  <ListItemButton >
                                    {subItem.icon}
                                    <ListItemContent>
                                      <Link href={subItem.href}><Typography className=" text-xs">{subItem.label}</Typography></Link>
                                    </ListItemContent>
                                  </ListItemButton>
                                </ListItem>
                              )
                            }


                          })
                        }
                      </List>
                    </Toggler>
                  </ListItem>
                )
              }
              else {
                return (
                  <ListItem key={index}>
                    <ListItemButton>
                      {item.icon}
                      <ListItemContent>
                        <Link href={item.href}><Typography level="title-sm">{item.label}</Typography></Link>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                )
              }
            }
          })}









        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
        {/* Pro Card */}
        {/* <Card
        invertedColors
        variant="soft"
        color="warning"
        size="sm"
        sx={{ boxShadow: 'none' }}
        className="hidden"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography level="title-sm">Upgrade to Pro</Typography>
          <IconButton size="sm">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Typography level="body-xs">
          Your team has used 80% of your available space. Need more?
        </Typography>
        <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
        <Button size="sm" variant="solid">
          Upgrade plan
        </Button>
      </Card> */}
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>


        {user &&
          <User user={user} />
        }
      </Box>

    </Sheet>
  );
}
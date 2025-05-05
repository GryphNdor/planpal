import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { FaBook, FaHome, FaPen, FaCalendar, FaSearch, FaHistory } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Stack, Title, Text, Avatar, useMantineTheme, UnstyledButton, Drawer, localStorageColorSchemeManager } from '@mantine/core';
import { useState } from "react"
import CreateLesson from './pages/CreatePlan.page';
import Browse from './pages/Browse.page';
import Course from './pages/Course.page';
import EditPlan from './pages/EditLesson.page';
import Shared from './pages/Shared.page';
import SharedPlan from './pages/SharedPlan.page';
import Archive from './pages/Archive.page';
import ViewPlan from './pages/ViewLesson.page';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lessons', element: <CreateLesson/> },
      { path: 'lessons/edit', element: <EditPlan/> },
      { path: 'lessons/shared', element: <SharedPlan/> },
      { path: 'lessons/view', element: <ViewPlan/> },
      { path: 'browse', element: <Browse/> },
      { path: 'courses/:id', element: <Course /> },
      { path: 'shared', element: <Shared/> },
      { path: 'archive', element: <Archive/> },
    ],
  },
]);

const mockData = [
  { title: 'Calculus', time: 'T/R 1:00 PM - 2:15PM' },
  { title: 'AP Biology', time: 'M/W 12:00 PM - 1:15PM' },
  { title: 'Calculus 2', time: 'T/R 11:00 PM - 12:00PM' },
  { title: 'Art', time: 'T/R 9:00 PM - 10:00PM' },
  { title: 'Geometry', time: 'M/F 11:00 PM - 12:00PM' }
]    

const ICON_SIZE = 32

function Navigation () {
  const [active, setActive] = useState("Home")
  const [opened, { open, close }] = useDisclosure(false);

  const mainLinksMockdata = [
    { icon: FaHome, label: 'Home', to: '/' },
    { icon: FaBook, label: 'Courses', to: location.pathname },
    { icon: FaPen, label: 'Lesson', to: '/lessons' },
    { icon: FaSearch, label: 'Browse', to: '/browse' },
    { icon: FaUserGroup, label: 'Shared', to: '/shared' },
  ];

  const handleClick = (label: string) => {
    setActive(label)
    if (label === "Courses") {
      open()
    }

  }

  return (
    <>
      {
        mainLinksMockdata.map((item) => (
          <NavLink to={item.to} style={{ textDecoration: "none", color: 'white' }}>
            <UnstyledButton w="100" h="100"
              onClick={() =>
                handleClick(item.label)
              }
              bg={active === item.label ? 'secondary' : ''}
              c={active === item.label ? 'black' : 'white'}>
              <Stack justify="center" align="center" gap={0}>
                <item.icon size={ICON_SIZE}/>
                <Text size='lg'>{item.label}</Text>
              </Stack>
            </UnstyledButton>
          </NavLink>
        ))
      }

      <Drawer radius="md" offset={100} opened={opened} onClose={close} position="left" title="Courses" overlayProps={{ backgroundOpacity: 0 }} 
        styles={{
          title: {
            fontSize: '1.5rem',
            fontWeight: 700,
          },
        }}>

        <Stack>
          {mockData.map(
            (item) => {
              return (
                <NavLink to={`/courses/${item.title}`}>
                <UnstyledButton>
                  {item.title}
                </UnstyledButton>
                </NavLink>
              )
            })}
        </Stack>
      </Drawer>
    </>
  )
}


function Layout() {
  const [opened, { toggle }] = useDisclosure();

 const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      withBorder={false}
    >
      <AppShell.Header bg={theme.colors.primary[8]}>
        <Group h="100%" px="md" justify='space-between'>
          <>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={2}>PlanPal</Title>
          </>
          <Avatar radius="xl" variant="white"></Avatar>
        </Group>

      </AppShell.Header>

      <AppShell.Navbar bg={'#1C110A'} c={'white'}>
        <AppShell.Section grow>
          <Navigation/>
        </AppShell.Section>

        <AppShell.Section>
          <NavLink to="/archive" style={{ textDecoration: 'none', color: 'white' }}>
            <Stack h={100} justify='center' align="center" gap={0}>
              <FaHistory size={ICON_SIZE} />
              <Text size='lg'>Archive</Text>
            </Stack>
          </NavLink>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export function Router() {
  return <RouterProvider router={router} />;
}

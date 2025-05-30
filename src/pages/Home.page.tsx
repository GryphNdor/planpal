import { SimpleGrid, Title, Container, Paper, useMantineTheme, Stack, Text, Flex, Group, Card, Image, Badge, Button, UnstyledButton, Modal, Dialog, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const cards = [
  {
    image: 'https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Space',
    new: true,
    desc: 'This lesson takes students on a journey beyond Earth to explore the wonders of outer space. Students will learn about the structure of the solar system, the life cycle of stars, galaxies, black holes, and the expanding universe. Through engaging visuals, interactive discussions, and hands-on activities, students will gain a deeper understanding of celestial bodies and the science behind space exploration. The lesson also introduces key missions, telescopes, and the role of technology in uncovering the mysteries of the cosmos.'
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?q=80&w=2763&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'How To Use GenAI',
    new: true,
    desc: 'In this lesson, students will explore the fundamentals of generative AI and learn how to effectively use tools like ChatGPT, image generators, and other AI applications. Through guided activities, students will practice crafting effective prompts, understand the strengths and limitations of AI, and discuss responsible and ethical use. By the end of the session, learners will be equipped with practical skills to integrate generative AI into creative, academic, or professional tasks.'
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1674071397682-08b2b5fa651e?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'What are shapes?',
    new: false,
    desc: 'In this fun and hands-on lesson, students will learn to identify, name, and describe basic 2D and 3D shapes such as circles, squares, triangles, rectangles, cubes, spheres, and more. Through interactive activities, games, and real-world examples, students will explore the properties of shapes—including sides, corners, and faces—and begin to recognize them in everyday life. This lesson builds foundational geometry skills in a playful and meaningful way.'
  }
]

type Item = {
  image: string
  title: string
  new: boolean
  desc: string
}

export function HomePage() {

  const theme = useMantineTheme()
  const [opened, {close, toggle}] = useDisclosure()
  const [openDialog, handleDialog] = useDisclosure()
  const [item, setItem] = useState<Item>()

  const mockData = [
    { title: 'Calculus', time: 'T/R 1:00 PM - 2:15PM' },
    { title: 'AP Biology', time: 'M/W 12:00 PM - 1:15PM' },
    { title: 'Calculus 2', time: 'T/R 11:00 PM - 12:00PM' },
    { title: 'Art', time: 'T/R 9:00 PM - 10:00PM' },
    { title: 'Geometry', time: 'M/F 11:00 PM - 12:00PM' }
  ]    

  const handleModal = (item: Item) => {
    setItem(item)
    toggle()
  }

  const handleImport = () => {
    toggle()
    handleDialog.toggle()
    setTimeout(() => handleDialog.close(), 3000)
  }

  return (
    <>
      <Title order={1} p="md"> Home Dashboard </Title>
      <Container fluid bg={'#F3F3F3'}>
        <Title order={2} pt={25} pb={15}>My Courses</Title>
        <SimpleGrid cols={3}>
          {mockData.map((item, index) => {
            return (
              <Paper w="400" h="100" shadow="xs" bg={index % 2 == 0 ? theme.colors.primary[8] : theme.colors.secondary[4]}>
                <NavLink to={`/courses/${item.title.replace(/\s/g, '')}`}>
                  <UnstyledButton>
                    <Flex w="400" h="100" align={"center"} p="md">
                      <Stack gap={0} c={index % 2 == 0 ? 'white' : 'black'}>
                        <Title order={3}>{item.title}</Title>
                        <Text>{item.time}</Text>
                      </Stack>
                    </Flex>
                  </UnstyledButton>
                </NavLink>
              </Paper>
              
            )
          })}
        </SimpleGrid>

        <Title order={2} pt={55} pb={15}>Upcoming Lessons</Title>
        <Stack>
          <Paper w="50%" shadow="xs" bg={'#D9D9D9'}>
            <Group h="50" p="xs" justify="space-between" align="center">
              <Title order={4}>Calculus - Derivatives</Title>
            </Group>
          </Paper>
          <Paper w="50%" shadow="xs" bg={'#D9D9D9'}>
            <Group  h="50" p="xs" justify="space-between" align="center">
              <Title order={4}>Art - Shapes and Boxes</Title>
            </Group>
          </Paper>
        </Stack>

        <Title order={2} pt={55} pb={15}>Template Plans For You</Title>
        <Group gap={50} p="md" align="start">
          {
            cards.map((card) => (
              <Card shadow="sm" padding="lg" w={400} radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={card.image}
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{card.title}</Text>
                  {card.new && <Badge color="pink">New!</Badge>}
                </Group>

                <Text size="sm" c="dimmed" truncate="end">
                  {card.desc}
                </Text>

                <Button onClick={() => handleModal(card)} color="blue" fullWidth mt="md" radius="md">
                  Preview Lesson
                </Button>
              </Card>

            ))
          }
        </Group>

        <Modal opened={opened} onClose={close} title={item?.title}>
          <Text size="sm" fw={700}>Content</Text>
          <Text size="sm">
            {item?.desc}
          </Text>
          <Button color="blue" fullWidth mt="md" radius="md" onClick={handleImport}>
            Import Lesson
          </Button>
        </Modal>
      </Container>

      <Dialog opened={openDialog} bg={"red"}>
        <Alert color="red" variant="filled">Not Implemented</Alert>
      </Dialog>
    </>
  );
}

import { Input, Title, Container, CloseButton, Button, Image, Group, Card, Text, Badge, Modal, ModalTitle } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

type Item = {
  image: string
  title: string
  new: boolean
  desc: string
}

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

const apBioCard = {
  image: 'https://images.unsplash.com/photo-1616304389380-e2242ea55de7?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  title: 'Krebs Cycle',
  new: false,
  desc: 'In this AP Biology lesson, students will dive deep into the Krebs cycle (also known as the citric acid cycle), a critical step in cellular respiration. Through interactive diagrams, discussions, and practice questions, students will learn how this cycle generates energy-rich molecules (NADH, FADH₂, and ATP) by oxidizing acetyl-CoA. The lesson emphasizes the biochemical steps, enzyme involvement, and the cycle’s role in the broader context of metabolism. By the end, students will be able to trace carbon atoms, explain energy transfer, and connect the Krebs cycle to glycolysis and the electron transport chain.'
}

export default function Browse() {
  const [value, setValue] = useState('');
  const [opened, {close, toggle}] = useDisclosure()
  const [item, setItem] = useState<Item>()

  const handleModal = (item: Item) => {
    setItem(item)
    toggle()
  }

  return (
    <>
      <Title order={1} p="md"> Browse Templates </Title>
      <Container fluid>
        <Title order={3}>Search</Title>
        <Group align="center" pt="xs">
          <Input
            placeholder="Find Course Templates"
            value={value}
            w={400}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="close-button"
                onClick={() => setValue('')}
              />
            }
          />
        </Group>
      </Container>

      <Group gap={50} p="md" pt="50" align="start">
        {
          value === 'AP Bio' &&
          <Card shadow="sm" padding="lg" w={400} radius="md" withBorder>
            <Card.Section>
              <Image
                src={apBioCard.image}
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{apBioCard.title}</Text>
              {apBioCard.new && <Badge color="pink">New!</Badge>}
            </Group>

            <Text size="sm" c="dimmed" truncate="end">
              {apBioCard.desc}
            </Text>

            <Button onClick={() => handleModal(apBioCard)} color="blue" fullWidth mt="md" radius="md">
              Preview Lesson
            </Button>
          </Card>
        }
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

      {

        <Modal opened={opened} onClose={close} title={item?.title}>
          <Text size="sm" fw={700}>Content</Text>
          <Text size="sm">
            {item?.desc}
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
            Import Lesson
          </Button>

        </Modal>
      }
    </>
  )
}

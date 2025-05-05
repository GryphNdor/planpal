import { Title, Container, Paper, UnstyledButton, Flex, Stack, Text, Group, Button, Grid } from "@mantine/core";
import { NavLink, useParams } from "react-router-dom";
import { FaPencil, FaUserGroup } from "react-icons/fa6";


export default function Course() {
  const { id } = useParams()

  return (
    <>
      <Title order={1} p="md">{id}</Title>
      <Container fluid>
        <Title order={3}>Lesson Plans</Title>
        <Grid>
          <Grid.Col span={8}>
            {id === 'Calculus' &&
              <Paper w="400" h="100" shadow="xs" mt={10} withBorder>
                <NavLink to={`/lessons/edit`}>
                  <UnstyledButton>
                    <Flex w="400" h="100" align={"center"} p="md">
                      <Stack gap={0} c={'black'}>
                        <Group justify="space-between">
                          <Title order={4}>Derivatives</Title>
                          <FaPencil />
                        </Group>
                        <Text>4/30/2025</Text>
                      </Stack>
                    </Flex>
                  </UnstyledButton>
                </NavLink>
              </Paper>
            }

            {id === 'Art' &&
              <Paper w="400" h="100" shadow="xs" mt={10} withBorder>
                <UnstyledButton>
                  <Flex w="400" h="100" align={"center"} p="md">
                    <Stack gap={0} c={'black'}>
                      <Group justify="space-between">
                        <Title order={4}>Shapes and Boxes</Title>
                        <FaUserGroup />
                      </Group>
                      <Text>5/1/2025</Text>
                    </Stack>
                  </Flex>
                </UnstyledButton>
              </Paper>
            }
          </Grid.Col>
          <Grid.Col span={4}>
            <NavLink to="/lessons">
              <Button>Generate Lesson</Button>
            </NavLink>
          </Grid.Col>
        </Grid>
      </Container>
    </>
      )
}

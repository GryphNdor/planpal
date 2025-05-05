import { Title, Container, Paper, UnstyledButton, Flex, Stack, Text, Group, Grid } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";


export default function Archive() {

  return (
    <>
      <Title order={1} p="md">Archive</Title>
      <Container fluid>
        <Title order={3}>2022 Lesson Plans</Title>
        <Grid>
          <Grid.Col span={8}>
            <Paper w="400" h="100" shadow="xs" mt={10} withBorder>
              <NavLink to={`/lessons/view`}>
                <UnstyledButton>
                  <Flex w="400" h="100" align={"center"} p="md">
                    <Stack gap={0} c={'black'}>
                      <Group justify="space-between">
                        <Title order={4}>Derivatives</Title>
                        <FaEye/>
                      </Group>
                      <Text>2/30/2022</Text>
                    </Stack>
                  </Flex>
                </UnstyledButton>
              </NavLink>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
      )
}

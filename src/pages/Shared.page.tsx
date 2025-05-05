import { Title, Container, Paper, UnstyledButton, Flex, Stack, Text, Group, Button, Grid, Avatar } from "@mantine/core";
import { NavLink } from "react-router-dom";


export default function Shared() {

  return (
    <>
      <Title order={1} p="md">Shared Plans</Title>
      <Container fluid>

        <Paper w="400" h="100" shadow="xs" mt={10} withBorder>
          <NavLink to="/lessons/shared">
            <UnstyledButton>
              <Flex w="400" h="100" align={"center"} p="md">
                <Stack gap={0} c={'black'}>
                  <Group justify="space-between">
                    <Title order={4}>Shapes and Boxes</Title>
                    <Avatar color="cyan" radius="xl">MK</Avatar>
                  </Group>
                  <Text>5/1/2025</Text>
                  <Text>Last edited: 4/26/2025</Text>
                </Stack>
              </Flex>
            </UnstyledButton>
          </NavLink>
        </Paper>
      </Container>
    </>
      )
}

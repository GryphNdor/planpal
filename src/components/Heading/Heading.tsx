import { Title } from "@mantine/core";
import styles from "./Heading.module.css"

interface HeadingProps {
  title: string
}

export default function Heading({title}: HeadingProps) {
  return (
  <Title className={styles.header} p="md">{title}</Title>

  )

}

import Chart from "@/components/chart/Chart";
import Scores from "@/components/chart/Scores";
import { _Layout, _Text } from "@/components/ultis";
import { StyleSheet } from "react-native";

export default function ChartScreen() {
  return (
    <_Layout style={ styles.layout }>
      <Chart />
      <Scores />
    </_Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    marginBottom: 40
  }
})
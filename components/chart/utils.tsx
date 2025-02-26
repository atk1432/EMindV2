import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { _Text } from '../ultis';

export interface PieChartData {
  value: number;
  color: string;
  label: string;
}

interface PieChartProps {
  widthSvg: number;
  heightSvg: number;
  centerX: number;
  centerY: number;
  radius: number;
  data: PieChartData[];
}

const pieChartData: PieChartData[] = [
  { value: 30, color: '#FF5733', label: 'Red' },
  { value: 20, color: '#33FF57', label: 'Green' },
  { value: 25, color: '#3357FF', label: 'Blue' },
  { value: 25, color: '#F7B733', label: 'Orange' },
];

export const PieChart: React.FC<PieChartProps> = ({ widthSvg, heightSvg, centerX, centerY, radius, data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;

  return (
    <View>
      <Svg width={widthSvg} height={heightSvg} viewBox={`0 0 ${widthSvg} ${heightSvg}`}>
        {/* Full Circle Background */}
        <Circle cx={centerX} cy={centerY} r={radius} fill="#f5f5f5" stroke="#333" strokeWidth="2" />

        {/* Pie Chart Slices */}
        {data.map((item, index) => {
          const angle = (item.value / total) * 2 * Math.PI || 0;
          const x1 = centerX + radius * Math.cos(cumulativeAngle);
          const y1 = centerY + radius * Math.sin(cumulativeAngle);
          cumulativeAngle += angle;
          const x2 = centerX + radius * Math.cos(cumulativeAngle);
          const y2 = centerY + radius * Math.sin(cumulativeAngle);
          const largeArcFlag = angle > Math.PI ? 1 : 0;
          const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          // Calculate text position
          const midAngle = cumulativeAngle - angle / 2;
          const textX = centerX + (radius * 0.6) * Math.cos(midAngle);
          const textY = centerY + (radius * 0.6) * Math.sin(midAngle);
          const percentage = ((item.value / total) * 100).toFixed(1) + '%';

          return (
            // <View key={index}>
              <Path key={index} d={pathData} fill={item.color} stroke="#fff" strokeWidth="2" />
            /* <SvgText
                key={`text-${index}`}
                x={textX}
                y={textY}
                fill="#fff"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {percentage}
              </SvgText> */
            // </View>
          );
        })}
      </Svg>
      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <_Text style={styles.legendText}>{item.label}</_Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default PieChart;

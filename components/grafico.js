import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import Tituloh2 from './titulos';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; 

Chart.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 300px;  
  height: 300px; 
  text-align: center;
  margin-left: 100px;
`;

const Grafico = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#6ca6a3', '#e5e6b8'],
      },
    ],
  };

  return (
    <ChartContainer>
      <Tituloh2>Progresso</Tituloh2>
      {tasks.length > 0 ? <Pie data={data} /> : <p>Nenhuma tarefa disponível.</p>}
    </ChartContainer>
  );
};

export default Grafico;

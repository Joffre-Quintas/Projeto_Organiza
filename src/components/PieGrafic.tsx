import Chart from "react-google-charts";

export default function PieGrafic(props: any) {
  return (
    <div className='mt-16 w-3/4'>
        <h2 className='mb-4 text-lg'>{props.title}</h2>
        <div className="rounded-lg overflow-hidden shadow-md shadow-slate-200">
          <Chart
            chartType="PieChart"
            data={props.data}
            options={{title: ''}}
            width={"100%"}
            height={"400px"}
          />
        </div>
    </div>  
  )
}
import Chart from "react-google-charts";

export default function ColumnDiffGrafic(props:any) {
  return (
    <div className='mt-16 w-3/4'>
        <h2 className='mb-4 text-lg'>{props.title}</h2>
        <div className="rounded-lg overflow-hidden shadow-md shadow-slate-200"></div>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            diffdata={props.data}
          />
        <div/>
    </div>
    )
}
import Button from '../components/Button'

export default function Home() {
  return (
    <>
      <select name="" id="">
        <option value="">Developer</option>
        <option value="">Designer</option>
        <option value="">Tester</option>
        <option value="">System Analyst</option>
      </select>
      <Button
        type="button"
        style="primary"
        size="sm"
        onClick={() => {}}
        isDisabled={false}
      >
        <b className="font-semibold font-sanam-deklen tracking-widest text-2xl flex items-center px-12  ">
          ค้นหา
        </b>
      </Button>
    </>
  )
}

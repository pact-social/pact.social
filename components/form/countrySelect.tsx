import { useFormContext } from "react-hook-form";
import iso3311a2 from 'iso-3166-1-alpha-2';

export default function CountrySelect () {
  const { register } = useFormContext()
  return (
    <div className="form-control">
      <label htmlFor="country" className="label cursor-pointer">
        country: 
      </label>
      <select 
        id="country" 
        className="select select-primary w-full max-w-xs"
        {...register('country', {required: false})}
      >
        <option disabled selected>Select a country</option>
        {Object.entries(iso3311a2.getData()).map(([key, value], index) => 
          <option key={key} value={key}>
            {value}
          </option>
        )}
      </select>
    </div>
  )
}

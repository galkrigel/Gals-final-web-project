import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TProperty } from '../../types/TProperty';
import { ShowBy as ShowByEnum } from '../../enums/showBy';

const values = [ShowByEnum.None, ShowByEnum.PriceHighToLow, ShowByEnum.PriceLowToHigh];

interface Props {
    setData: (data: TProperty[]) => void;
    data: TProperty[];
}

export default function ShowBy(props: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        switch (event.target.value) {
            case ShowByEnum.PriceLowToHigh: {
                const newData: TProperty[] = [...props.data].sort((a, b) => a.price - b.price);
                props.setData(newData);
                break;
            }
            case ShowByEnum.PriceHighToLow: {
                const newData: TProperty[] = [...props.data].sort((a, b) => b.price - a.price);
                props.setData(newData);
                break;
            }
            default: {
                props.setData(props.data);
                break;
            }
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Show by</InputLabel>
                <Select
                    label="Show by"
                    defaultValue={ShowByEnum.None}
                    onChange={handleChange}
                >
                    {values?.map((item: string, i: number) => (
                        <MenuItem value={item} key={i}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
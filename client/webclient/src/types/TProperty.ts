import { TAddress } from "./TAddress"
import { TIdentifier } from "./TIdentifier"
import { TBuilding } from "./TBuilding"
import { TSummary } from "./TSummary"

export type TProperty = {
    address: TAddress,
    building: TBuilding,
    identifier: TIdentifier,
    summary: TSummary
}


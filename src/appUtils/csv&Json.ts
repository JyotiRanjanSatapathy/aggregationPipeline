import Papa from 'papaparse'

export class formatChangeBll {
    jsonToCsv(ObjectData: any, Fields: any) {
        try {
            let csv = Papa.unparse({
                fields: Fields,
                data: ObjectData
            })

            return csv
        } catch (err) {
            console.log(err)
            return []
        }
    }

    csvTOJson(data: any) {
        try {
            const parseConfigObject = {
                header: true,
                dynamicTyping: true
            }
            let json = Papa.parse(data, parseConfigObject).data
            return json

        } catch (err) {
            console.log(err)
            return []
        }
    }
}
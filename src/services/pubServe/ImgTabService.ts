import { ImgTab, ImgPath } from "../../entities";
import { ImgTabModel } from "../../db";

export class ImgTabService {
    private static async add(img: ImgTab) {
        img = ImgTab.transform(img)
        const errs = await img.validateThis()
        if (errs.length) {
            return errs
        }

        return await ImgTabModel.create(img)
    }

    public static async edit(useID: string, type: string, imgPath: ImgPath, status: number) {
        const result = await ImgTabModel.findOne({ useID })

        if (!result) {
            const obj: any = {
                useID,

            }
            ImgTabModel.create()
        }
    }


}
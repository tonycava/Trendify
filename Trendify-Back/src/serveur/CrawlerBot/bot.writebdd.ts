import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export type objJson = {
  Id?: number,
  Views?: string,
  Follow?: string,
  Category?: string,
  Tag?: string,
  SpecTop?: string,
  NameTop?: string,
  DateLaunch?: string
  ImgTopLive?: string
  ImgTrendTop?: string
  ImgTop?: string,
  NameTopStream?: string
}

export const botWriteBdd = async (trend: objJson[]) => {
    await prisma.trend.deleteMany()

  trend.map(async (item: objJson, index: number) => {
    if (index === trend.length - 1) return

    await prisma.trend.create({
      data: {
        Id: item.Id ?? 404,
        Views: item.Views ?? "No Views provided",
        Follow: item.Follow ?? "No Follow provided",
        Category: item.Category ?? "No Category provided",
        Tag: item.Tag ?? "No Tag provided",
        TrendTopImg: item.ImgTrendTop ?? "No Image Provided",
        TrendLive: {
          create: {
            Id: item.Id ?? 404,
            SpecTop: item.SpecTop ?? "No Views provided",
            NameTop: item.NameTop ?? "No Follow provided",
            ImgTop: item.ImgTop ?? "No Image Set",
            UrlTopLive: item.ImgTopLive ?? "No Url provided",
            NameTopLive: item.NameTopStream ?? "No Name provided"
          }
        }
      }
    })
  })
}
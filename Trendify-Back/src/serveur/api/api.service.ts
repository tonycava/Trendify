import {prisma} from "../CrawlerBot/bot.writebdd";
import trend from '../../data/tendanceTwitch.json'

export const sendJSON = async () => {
  return await prisma.trend.findMany({
    orderBy: {
      Id: 'asc'
    },
    include: {
      TrendLive: true
    }
  })
}

export const sendJSONById = async (id: string) => {
  return await prisma.trend.findMany({
    where: {
      Id: +id
    },
    include: {
      TrendLive: true
    }
  })
}

export const sendDate = () => {
  return trend.twitchTrendArray.at(-1)
}

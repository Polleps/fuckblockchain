import type { Tracker } from "$lib/Models/Tracker";
import type { TimePeriod } from "$lib/Models/Cache";
import type {
  RequestHandler
} from "@sveltejs/kit";

const getTimeRelative = (days: number): string => {
  const today = new Date();

  const relativeDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);

  return relativeDate.toISOString();
};

const randomMockData = (): TimePeriod[] => {
  const data = [];

  for (let i = -7; i < 1; i++) {
    data.push({
      time: getTimeRelative(i),
      data: Math.floor(Math.random() * 3000),
    })
  }

  return data;
}

const mockData = {
  BTC_VALUE: [
    {
      data: 1540,
      time: getTimeRelative(-7)
    },
    {
      data: 1600,
      time: getTimeRelative(-6)
    },
    {
      data: 1530,
      time: getTimeRelative(-5)
    },
    {
      data: 1580,
      time: getTimeRelative(-4)
    },
    {
      data: 1300,
      time: getTimeRelative(-3)
    },
    {
      data: 1221,
      time: getTimeRelative(-2)
    },
    {
      data: 1100,
      time: getTimeRelative(-1)
    },
    {
      data: 900,
      time: getTimeRelative(0)
    },
  ],
  ETH_VALUE: randomMockData(),
  BLOCKCHAIN_TREND: randomMockData(),
  NFT_TREND: randomMockData(),
}

export const get: RequestHandler = async ({ params }) => {
  const dataType = params.datatype as Tracker;

  const data = mockData[ dataType ];

  if (!data) {
    return {
      status: 400,
    }
  }

  return {
    body: {
      data
    }
  }
};

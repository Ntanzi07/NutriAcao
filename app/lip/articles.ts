import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from "remark"
import html from "remark-html"

import type { ArticleItem } from "@/types"

const articleDirectory = path.join(process.cwd(), "articles")

const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articleDirectory)

    const allArticlesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "")

        const fullPath = path.join(articleDirectory, fileName)
        const fileContent = fs.readFileSync(fullPath, "utf-8")

        const matterResult = matter(fileContent)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            category: matterResult.data.category,
        }
    })

    return allArticlesData.sort((a, b) => {
        const format = "DD-MM-YYYY"
        const dateOne = moment(a.date, format)
        const dateTwo = moment(b.date, format)
        if (dateOne.isBefore(dateTwo)) {
            return -1
        } else if (dateTwo.isAfter(dateOne)) {
            return 1
        } else {
            return 0
        }

    })
}


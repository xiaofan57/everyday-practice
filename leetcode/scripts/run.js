/**
 * 填写配置数据 - 执行 - 自动写入 - 自动提交
 */

const fs = require("fs/promises")
const path = require("path")
const { getQuestionInfo } = require("./spy")

const RecordFilePath = path.join(__dirname, "..", "record.json")

const record = async (options = {}) => {
  let content
  try {
    content = await fs.readFile(RecordFilePath, "utf-8")
    content = JSON.parse(content)
  } catch (_) {
    // file not exist
    content = {}
  }

  const { id } = options
  const curr = Math.floor(Date.now() / 1000).toString()
  let prevRecord = content[id] || {
    ctime: curr,
  }

  const remoteRecord = await getQuestionInfo(id)

  content[id] = {
    ...prevRecord,
    ...remoteRecord,
    ...options,
    id: undefined, // remove "id" field,
    mtime: curr,
  }
  content = JSON.stringify(content)
  await fs.writeFile(RecordFilePath, content)
}

const dump = async id => {}

module.exports = { record, dump }

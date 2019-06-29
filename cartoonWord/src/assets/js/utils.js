//判断是否正整数
function isPlusInt(val) {
	return _.isSafeInteger(val) && val >= 0;
}

//jqTable关联函数：根据列返回列数据类型
function getFieldType(cols) {
	let fields = [];
	_.each(cols, col => {
		fields.push({
			name: col.datafield,
			type: col.type || 'string'
		});
		if(col.displayfield){
			fields.push({
				name: col.displayfield,
				type: 'string'
			});
		}
		//delete col.type;
	});
	return fields;
}

//jqTable关联函数：根据字段数据类型设置默认值
function setFieldDefaultValue(data, datafields){
	let list = [];
	if(_.isArray(data)){
		_.each(data, item => {
			list.push(revise(item, datafields));
		})
	}else if(_.isObject(data)){
		list.push(revise(data, datafields));
	}
	return list;
	function revise(data, datafields){
		let newData = {};

		//定义值
		_.each(data, (value, key) => {
			_.each(datafields, item => {
				if(item.name == key){
					if(typeof value != item.type){
						switch (item.type) {
						case "boolean":
							value = !!value;
							break;
						case "number":
							value = _.isNaN(Number(value)) ? 0 : Number(value);
							break;
						case "string":
							value = value == null ? '' : value;
							break
						case "object":
							value = value == null ? {} : value
							break
						case "array":
							value = value == null ? [] : value
							break
						default:
							
						}
					}
				}
			});
			newData[key] = value;
		});
		//补全字段
		_.each(datafields, item => {
			if(data[item.name]  === undefined){
				let value;
				switch (item.type) {
				case "boolean":
					value = false;
					break;
				case "number":
					value = 0;
					break;
				case "string":
				default:
					value = '';
				}
				newData[item.name] = value;
			}
		});

		return newData;
	}
}














export {
	isPlusInt,
	getFieldType,
	setFieldDefaultValue
}
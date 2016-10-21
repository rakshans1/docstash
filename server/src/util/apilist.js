import Table from 'cli-table'

const apilist = function(routes) {
    const table = new Table({
        head: ["", "Name", "Path"]
    });

    console.log('\nAPI for this service \n');

    console.log('\n********************************************');
    console.log('\t\tDOCSTASH API');
    console.log('********************************************\n');
    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            var val = routes[key];
            if (val.route) {
                val = val.route;
                var _o = {};
                _o[val.stack[0].method] = [val.path, val.path];
                table.push(_o);
            }
        }
    }

    console.log(table.toString());

    return table;
};

export default apilist;

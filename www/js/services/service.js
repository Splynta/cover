angular.module('cover4App.services', [])

.factory('Policies', function() {
    var list = [
        { id: 0, title: 'Student Insurance', href: 'http://studentpossessions.cover4insurance.com' },
        { id: 1, title: 'Tenant Insurance', href: 'http://tenantinsurance.cover4insurance.com' },
        { id: 2, title: 'Block Halls', href: 'http://blockhalls.cover4insurance.com' },
        { id: 3, title: 'Irish Student Insurance', href: 'http://irishstudent.cover4insurance.com' },
        { id: 4, title: 'Specialist Product Insurance', href: 'http://product.cover4insurance.com' }
    ];
    
    return {
        getAll: function() {
            return list;
        },
        get: function(id) {
            for(var x = 0; x < list.length; x++) {
                if(list[x].id == x) {
                    return list[x];
                }
            }
            
            return false;
        }
    }
})
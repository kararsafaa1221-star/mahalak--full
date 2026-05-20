const fs = require('fs');

function fixLine() {
  let f = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

  // Let's find the exact line 556 that starts with // We should send a notification
  const lines = f.split('\n');
  const targetIndex = lines.findIndex(l => l.trim().startsWith('// We should send a notification to customers who enabled notifications'));

  if (targetIndex === -1) {
    console.log('Target line not found');
    return;
  }

  const targetLine = lines[targetIndex];
  
  // We want to replace the whole line with the expanded actual code.
  // We can see the code has `const updateProduct =`, `const deleteProduct =`, `const placeOrder =` etc inside it.
  
  const replacement = `// We should send a notification to customers who enabled notifications for this store
      if (customers.length > 0) {
        const storeName = stores.find(s => s.id === data.storeId)?.shopName || 'متجر';
        customers.forEach(async (c) => {
          if (c.storeNotifications?.includes(data.storeId)) {
            await addNotification({ userId: c.id, role: 'customer', title: \\\`منتج جديد من \\\${storeName} ✨\\\`, message: \\\`تمت إضافة منتج جديد: \\\${data.name}. سارع بالشراء الآن!\\\`, type: 'product', targetId: id });
          }
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'products/' + id);
    }
  };

  const updateProduct = async (id: string, data: any) => {
    try {
      const cleanData = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
      await updateDoc(doc(db, 'products', id), cleanData);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, 'products/' + id);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, 'products/' + id);
    }
  };

  const placeOrder = async (data: Omit<Order, 'id' | 'status' | 'createdAt'>, promoCodeText?: string) => {
    const id = generateOrderId();
    const newOrder: any = { ...data, id, status: 'pending', createdAt: serverTimestamp() };
    if (promoCodeText) {
      newOrder.promoCode = promoCodeText;
    }
    const cleanOrder = Object.fromEntries(Object.entries(newOrder).filter(([, v]) => v !== undefined));
    try {
      await setDoc(doc(db, 'orders', id), cleanOrder); //`;

  lines.splice(targetIndex, 1, replacement);
  fs.writeFileSync('src/context/AppContext.tsx', lines.join('\n'));
  console.log('Fixed comment issue.');
}

fixLine();

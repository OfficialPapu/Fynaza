"use client"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { Label } from "@/Components/ui/label"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { HandelDialogChanges } from "../../Redux/Slices/OrderDetailsSlice"
const UpdateStatusDialog = () => {
    const { isUpdateStatusDialogOpen, dispatch, handleStatusUpdate, currentStatus } = useOrderDetailsActions();
    return (
        <Dialog open={isUpdateStatusDialogOpen} onOpenChange={() => dispatch(HandelDialogChanges({ Type: "UpdateStatusDialogOpen" }))}>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                    <DialogDescription>Change the current status of this order.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="status">New Status</Label>
                        <Select defaultValue={currentStatus} onValueChange={handleStatusUpdate}>
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status-note">Note (Optional)</Label>
                        <Textarea id="status-note" placeholder="Add a note about this status change" className="min-h-[100px]" />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button variant="outline" onClick={() => dispatch(HandelDialogChanges({ Type: "UpdateStatusDialogOpen" }))}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleStatusUpdate(currentStatus)}>Update Status</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateStatusDialog

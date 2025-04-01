"use client"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { HandelDialogChanges } from "../../Redux/Slices/OrderDetailsSlice"

const AddNoteDialog = () => {
    const { isAddNoteDialogOpen, newNote, setNewNote, handleAddNote, dispatch } = useOrderDetailsActions();
    return (
        <Dialog open={isAddNoteDialogOpen} onOpenChange={() => dispatch(HandelDialogChanges({ Type: "UpdateAddNoteDialogOpen" }))}>
            <DialogContent className="max-w-[90vw] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Note to Order</DialogTitle>
                    <DialogDescription>Add a note or comment to this order.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="note">Note</Label>
                        <Textarea
                            id="note"
                            placeholder="Enter your note here"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="min-h-[150px]"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button variant="outline" onClick={() => dispatch(HandelDialogChanges({ Type: "UpdateAddNoteDialogOpen" }))}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleAddNote()} disabled={!newNote.trim()}>
                        Add Note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNoteDialog
